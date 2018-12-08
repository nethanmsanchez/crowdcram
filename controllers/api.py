# Here go your api methods.

#function to get current user email
def get_user_email():
    results = []
    results.append(dict(
        email=auth.user.email,
    ))
    return response.json(auth.user.email)

def add_user():
    email = request.vars.profile_email
    db.profile.update_or_insert(
        (db.profile.profile_email == email),
        profile_name=request.vars.profile_name,
        profile_bio=request.vars.profile_bio,
        profile_class_1=request.vars.profile_class_1,
        profile_class_2=request.vars.profile_class_2,
        profile_class_3=request.vars.profile_class_3,
    )
    return "ok"

def get_user():
    profile_email = request.vars.profile_email
    user = db(db.profile.profile_email == auth.user.email).select()
    count = 0
    for x in user:
        count = count + 1
    if count > 0:
        for x in user:
            result = dict(
                profile_name=x.profile_name,
                profile_bio=x.profile_bio,
                profile_class_1=x.profile_class_1,
                profile_class_2=x.profile_class_2,
                profile_class_3=x.profile_class_3,
            )
    else:
        result = dict(
            profile_name="enter a name",
            profile_bio="enter a bio",
            profile_class_1="enter a class",
            profile_class_2="enter a class",
            profile_class_3="enter a class",
        )
    return response.json(result)

def get_search_list():
    results = []
    users = db(db.profile.profile_class_1 == request.vars.search).select()
    for user in users:
        results.append(dict(
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    users2 = db(db.profile.profile_class_2 == request.vars.search).select()
    for user in users2:
        results.append(dict(
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    users3 = db(db.profile.profile_class_3 == request.vars.search).select()
    for user in users3:
        results.append(dict(
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    return response.json(dict(search_list=results))