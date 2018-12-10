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

def join_groups():
    crowd_id = request.vars.crowd_id
    num_members = int(request.vars.num_members)
    num_members = num_members + 1
    if num_members == 2:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_2= auth.user.email,
        )
    elif num_members == 3:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_3= auth.user.email,
        )
    elif num_members == 4:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_4= auth.user.email,
        )
    elif num_members == 5:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_5= auth.user.email,
        )
    elif num_members == 6:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_6= auth.user.email,
        )
    elif num_members == 7:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_7= auth.user.email,
        )
    elif num_members == 8:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_8= auth.user.email,
        )
    elif num_members == 9:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_9= auth.user.email,
        )
    elif num_members == 10:
        db.crowd.update_or_insert(
            (db.crowd.id == crowd_id),
                crowd_member_10= auth.user.email,
        )
    return "ok"

def invite_user():
    db.invite.insert(
        profile_email=request.vars.profile_email,
        crowd_id=request.vars.crowd_id,
    )
    return "ok"

def delete_invite():
    invite_id = request.vars.invite_id
    db(db.invite.id == invite_id).delete()
    return "ok"

def leave_group():
    crowd_id = request.vars.crowd_id
    num_members = request.vars.num_members
    profile_email = request.vars.profile_email
    crowd = db(db.crowd.id == crowd_id)
    for x in range(1,11):

     return "ok"

def add_group():
    crowd_id = db.crowd.insert(
        crowd_date=request.vars.crowd_date,
        crowd_time=request.vars.crowd_time,
        crowd_location=request.vars.crowd_location,
        crowd_class=request.vars.crowd_class,
        crowd_member_1=auth.user.email,
    )
    return response.json(dict(crowd_id=crowd_id))

def get_invites():
    results = []
    invites = db(db.invite.profile_email == auth.user.email).select()
    count = 0
    results2 = []
    for x in invites:
        results.append(dict(
            crowd_id=x.crowd_id,
            invite_id=x.id,
        ))
        crowd = db(db.crowd.id == x.crowd_id).select()
        for c in crowd:
            results2.append(dict(
                crowd_date=c.crowd_date,
                crowd_time=c.crowd_time,
                crowd_location=c.crowd_location,
                crowd_class=c.crowd_class,
                num_members=c.num_members,
                crowd_id=c.id,
                invite_id=x.id,
                profile_email=x.profile_email,
            ))
    return response.json(dict(invite_list=results, crowd_list=results2))

def get_crowd():
    results = []
    crowd = db(db.crowd.id == request.vars.crowd_id).select()
    results.append(dict(
        crowd_date=crowd.crowd_date,
        crowd_time=crowd.crowd_time,
        crowd_location=crowd.crowd_location,
        crowd_class=crowd.crowd_class,
        ))
    return response.json(dict(crowd_list=results))

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
            profile_email=user.profile_email,
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    users2 = db(db.profile.profile_class_2 == request.vars.search).select()
    for user in users2:
        results.append(dict(
            profile_email=user.profile_email,
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    users3 = db(db.profile.profile_class_3 == request.vars.search).select()
    for user in users3:
        results.append(dict(
            profile_email=user.profile_email,
            profile_name=user.profile_name,
            profile_bio=user.profile_bio,
            profile_class_1=user.profile_class_1,
            profile_class_2=user.profile_class_2,
            profile_class_3=user.profile_class_3,
        ))
    return response.json(dict(search_list=results))