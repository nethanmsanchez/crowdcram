# Here go your api methods.

#function to get current user email
def get_user_email():
    results = []
    results.append(dict(
        email=auth.user.email,
    ))
    return response.json(auth.user.email)
