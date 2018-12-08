# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.




# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)


import datetime

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_current_time():
    return datetime.datetime.utcnow()

db.define_table('profile',
                Field('profile_email', default=get_user_email()),
                Field('profile_name', 'text'),
                Field('profile_bio', 'text'),
                Field('profile_class_1', 'text'),
                Field('profile_class_2', 'text'),
                Field('profile_class_3', 'text'),
                )

