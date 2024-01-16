#!/bin/bash

function _django_config {
  RUN_PORT=${RUN_PORT:-8000}
 # migrate db and django
  echo "migrate django , postgres"
  python3 manage.py makemigrations --noinput
  python3 manage.py migrate --noinput
  python3 manage.py collectstatic --noinput

  # create superuser
  echo "creating superuser"
  python3 manage.py shell -c "exec(open('./create_admin.py','r').read())"

  if [[ "$STAGE" == "PRODUCTION" || "$STAGE" == "TESTING" ]]; then
    echo "------------ Running gunicorn ----------------"
    gunicorn decopoint.wsgi:application -b 0.0.0.0:$RUN_PORT
  else
    python3 manage.py runserver 0.0.0.0:$RUN_PORT
  fi
}

function _django_config_pg {

  if [ "$DATABASE" == "postgres" ]
  then

    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOSTNAME $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
    # migrate db and django
    echo "migrate django , postgres"
    _django_config
    
  fi
}

if [ "$1" == "init" ]
then

  if [ "$DATABASE" == "postgres" ];then
    echo "initializing django , postgres"
    _django_config_pg
  else
    echo "initializing django , sqlite"
    _django_config
  fi
fi

exec "$@"