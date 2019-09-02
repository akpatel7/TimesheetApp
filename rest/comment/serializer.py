from rest.account import serializer as account_serializer


def list(comments, **kwargs):
    return [
        single(comment, **kwargs)
        for comment in comments
    ]


def single(comment, **kwargs):
    data = {
        'id': comment.id,
        'account': account_serializer.single(comment.account),
        'date': comment.date.isoformat() if comment.date else None,
        'isDeleted': comment.is_deleted,
        'isEdited': comment.is_edited,
        'message': comment.message,
        'parentId': comment.parent_id,
        'asset': {
            'id': comment.asset.id,
            'name': comment.asset.name
        } if comment.asset else None,
    }

    return data
