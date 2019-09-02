def list(accounts, **kwargs):
    return [
        single(account, **kwargs)
        for account in accounts
    ]


def single(account, **kwargs):
    data = {
        'id': account.id,
        'email': account.email,
        'firstName': account.first_name,
        'lastName': account.last_name,
        'photo': account.photo.url if account.photo else None,
        'username': account.username,
        'isActive': account.is_active,
        'lastLogin': account.last_login,
        'dateJoined': account.date_joined,
    }

    return data
