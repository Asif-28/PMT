from mongoengine import Document, StringField, IntField, BooleanField
from mongoengine.errors import ValidationError


class Project(Document):
    ProjectName = StringField(required=True)
    ProjectCode = StringField(required=True)
    ProjectManager = StringField(required=True)
    ProjectSetupProjectManager = StringField(required=True)
    IncidenceRate = StringField(required=True)
    Loi = StringField(required=True)
    Scope = IntField(required=True)
    Target = StringField(required=True)
    TargetDescription = StringField(required=True)
    SelectedCountry = StringField(required=True)
    Online = BooleanField(required=True)
    SelectedDiv = StringField(required=True)
    BillingComments = StringField(required=True)

    def clean(self):
        self.IncidenceRate = f"{self.IncidenceRate}%"
        self.Loi = f"{self.Loi} Min"
        if self.Target not in ["HCP", "B2B", "B2C"]:
            raise ValidationError("Target must be one of GenPop, B2B, B2C")


class ProjectSetup(Document):
    ProjectCode = StringField(required=True)
    InputField = StringField(required=True)
    Country = StringField(required=True)
    CountryCode = StringField(required=True)
    Scope = IntField(required=True)
    TestLink = StringField(required=True)
    LiveLink = StringField(required=True)


class GetSurvey(Document):
    Ip = StringField(required=True)
    CountryCode = StringField(required=True)
    ProjectCode = StringField(required=True)
    VendorId = StringField(required=True)
    VendorCode = StringField(required=True)
    Test = BooleanField(default=False)


class PostSurvey(Document):
    Ip = StringField(required=True)
    Country = StringField(required=True)
    CountryCode = StringField(required=True)
    ProjectCode = StringField(required=True)
    Loi = StringField(required=True)
    TransId = StringField(required=True)
    VendorId = StringField(required=True)
    VendorCode = StringField(required=True)
    Status = StringField(required=True)
    FraudScore = IntField(required=True)
    Proxy = BooleanField(required=True)
    StartTime = IntField(required=True)
    EndTime = IntField(required=True)
