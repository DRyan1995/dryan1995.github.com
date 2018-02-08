 gunicorn -w 4 server:app -b 0.0.0.0:8008  --log-level debug -k gevent
# export FLASK_APP=server.py
# flask run --host=0.0.0.0
