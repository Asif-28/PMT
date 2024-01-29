from requests import Session

request_session = Session()


def scope_limit(scope: int, _scope_limit=100) -> bool:
    if scope > _scope_limit:
        raise ValueError(f"Scope should be less than {_scope_limit}")


def validate_ipqualityscore(ip, api_key):
    """
    Validate IP address using IPQualityScore API
    example response:
        {
        "success": true,
        "message": "Success",
        "fraud_score": 100,
        "country_code": "AT",
        "region": "Vienna",
        "city": "Vienna",
        "ISP": "Aeza International",
        "ASN": 210644,
        "organization": "Aeza International",
        "is_crawler": false,
        "timezone": "Europe\/Vienna",
        "mobile": false,
        "host": "tor-exit.node",
        "proxy": true,
        "vpn": true,
        "tor": true,
        "active_vpn": false,
        "active_tor": true,
        "recent_abuse": true,
        "bot_status": true,
        "connection_type": "Premium required.",
        "abuse_velocity": "Premium required.",
        "zip_code": "N\/A",
        "latitude": 48.2,
        "longitude": 16.37,
        "request_id": "KbbpJg7pk9"
    }
    """
    return request_session.get(
        f"https://ipqualityscore.com/api/json/ip/{api_key}/{ip}?strictness=2&fast=1"
    ).json()
