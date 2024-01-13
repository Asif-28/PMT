def scope_limit(scope: int) -> bool:
    _scope_limit = 100
    if scope > _scope_limit:
        raise ValueError(f"Scope should be less than {_scope_limit}")
