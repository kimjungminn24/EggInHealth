FROM python:3.9

ENV PYTHONIOENCODING=utf-8

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y libgl1-mesa-glx && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["python", "run.py"]