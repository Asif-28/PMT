from ninja import Router
from ..utils import message
from ..modules.project_survey_trace import ProjectSurveyTrace
from ..modules._custom_schemas import IDReconciliationSchema

router = Router()


@router.post("/update")
def update_status_via_reconciliation(request, data: IDReconciliationSchema):
    try:
        ProjectSurveyTrace.objects.filter(
            key__in=data.ids, project_code=data.project_code
        ).update(
            status=data.status,
        )
    except Exception as e:
        return message.error(f"{e}")

    return message.success("Status updated")
