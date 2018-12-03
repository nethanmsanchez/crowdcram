# Here go your api methods.

#function to get current user email
def get_user_email():
    results = []
    results.append(dict(
        email=auth.user.email,
    ))
    return response.json(auth.user.email)

def add_user():
    db.profile.insert(
        profile_name=request.vars.profile_name,
        profile_bio=request.vars.profile_bio,
        profile_classes=request.vars.profile_classes
    )
    return "ok"

def get_user():
    profile_email = request.vars.profile_email
    user = db(db.profile.profile_email == profile_email)
    result = dict(
        profile_name=user.profile_name,
        profile_bio=user.profile_bio,
        profile_classes=user.profile_classes,
    )
    return response.json(result)
