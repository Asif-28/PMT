from ninja import Router
from ..modules.project import ProjectCreation
from django.db import connection

from django.db.models import Count
from ..modules.project_survey_trace import ProjectSurveyTrace
from ..utils import dictfetchall

router = Router()


@router.get("/projects")
def read_live_portal(request, status: str = "live"):
    """
    Get all projects
    """
    all_projects = ProjectCreation.objects.filter(status=status)

    projects_data = dict()

    for i in all_projects:
        projects_data[i.project_code] = {
            "project_name": i.project_name,
            "project_status": i.status,
            "project_scope": i.scope,
            "loi": i.loi,
        }

    completed_surveys = (
        ProjectSurveyTrace.objects.filter(status="complete")
        .values("project_code")
        .annotate(total=Count("project_code"))
        .order_by("project_code")
    )

    # convert to dict
    data = []

    for p in completed_surveys:
        if projects_data.get(p["project_code"]) is None:
            continue
        data.append(
            {
                "project_code": p["project_code"],
                "count": p["total"],
                "scope": projects_data[p["project_code"]]["project_scope"],
                "status": projects_data[p["project_code"]]["project_status"],
                "loi": projects_data[p["project_code"]]["loi"],
                "project_name": projects_data[p["project_code"]]["project_name"],
                "total": p["total"],
            }
        )
    return data


@router.get("/project_summary/")
def project_data_summary(request, project_code: str):
    """
    Get project summary
    """

    def execute_raw_query(project_code):
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                    vendor_code,
                    status,
                    COUNT(*) AS total_count,
                    SUM(CASE WHEN status = 'terminate' AND qc_remarks='client terminate' THEN 1 ELSE 0 END) AS client_terminate,
                    SUM(CASE WHEN status = 'terminate' AND qc_remarks='DFP terminate' THEN 1 ELSE 0 END) AS DFP_terminate,
                    AVG(duration) AS avg_duration
                FROM
                    app_projectsurveytrace
                WHERE
                    project_code = '{project_code}'
                    AND test = 0
                GROUP BY
                    vendor_code,
                    status
            """
            )

            return dictfetchall(cursor)

    return execute_raw_query(project_code)


@router.get("/project_survey_dashboard/")
def project_survey_dashboard(request, project_code: str):
    """
    Get project survey dashboard
    """

    def execute_raw_query(project_code):
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT 
                    aggregated.just_date, 
                    aggregated.vendor_code, 
                    aggregated.counts, 
                    ap2.vendor_name, 
                    ap2.scope
                FROM 
                    (
                        SELECT 
                            DATE(ap.start_time) AS just_date, 
                            ap.vendor_code, 
                            COUNT(*) AS counts
                        FROM 
                            app_projectsurveytrace ap
                        WHERE 
                            ap.status = 'complete' 
                            AND ap.test = 0 
                            AND ap.project_code = '{project_code}'
                        GROUP BY 
                            just_date, 
                            ap.vendor_code
                    ) AS aggregated
                LEFT JOIN 
                    app_projectvendor ap2 
                    ON aggregated.vendor_code = ap2.vendor_code
                WHERE 
                    ap2.project_code = '{project_code}';
                    
            """
            )

            return dictfetchall(cursor)

    return execute_raw_query(project_code)
