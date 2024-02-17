import csv
import os
import boto3
from ninja import Router
from django.db import connection
from ..modules._custom_schemas import ExportDataResponse
from ..utils import dictfetchall, s3_get_object_date

router = Router()


@router.post("/csv", response=ExportDataResponse)
def export_data(request, project_code: str):
    """
    Export data to csv of a project eg. QQ_12024_001
    """
    s3 = boto3.client("s3")
    s3_bucket_name = os.environ.get("S3_BUCKET_NAME", "test-pmt-export-data")
    s3_object_expiry = 3600
    file_name = f"{project_code}.csv"
    file_path = f"/tmp/{file_name}"

    # check if file exists in s3 and return url if its less than expiry_seconds old
    # s3_file = s3_get_object_date(s3, s3_bucket_name, file_name, expiry_seconds=1)
    # if s3_file:
    #     object_url = s3.generate_presigned_url(
    #         ClientMethod="get_object",
    #         Params={"Bucket": s3_bucket_name, "Key": file_name},
    #         ExpiresIn=s3_object_expiry,
    #     )
    #     return ExportDataResponse(
    #         project_code=project_code,
    #         file_url=object_url,
    #         is_cached=True,
    #     )

    # get all data from project survey trace
    def execute_query(project_code):
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT * FROM  app_projectsurveytrace WHERE  project_code = '{project_code}'
                """
            )
            return dictfetchall(cursor)

    # write to csv
    data = execute_query(project_code)
    data_columns = data[0].keys()
    with open(file_path, "w") as f:
        writer = csv.DictWriter(f, fieldnames=data_columns)
        writer.writeheader()
        for d in data:
            writer.writerow(d)
    del data

    # upload to s3
    d = s3.upload_file(file_path, s3_bucket_name, file_name)

    # object url
    object_url = s3.generate_presigned_url(
        ClientMethod="get_object",
        Params={"Bucket": s3_bucket_name, "Key": file_name},
        ExpiresIn=s3_object_expiry,
    )

    return ExportDataResponse(
        project_code=project_code,
        file_url=object_url,
        is_cached=False,
    )
