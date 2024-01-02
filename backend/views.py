import time

def check_ip(ip):
    """
    Check if ip is valid
    """
    id = hash(ip+str(time.epoch()))
    return {
        "Ip": ip,
        "TransId": id,
        "PartnerId": "None",
        "PartnerName": "None",
        "Status": "None",
        "StartTime": "None", # Epoch tim"e
        "EndTime": "None", # Epoch tim"e
        "FraudScore": "None",
    }
