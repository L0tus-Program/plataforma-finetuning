import openai
import os
import json


def create_jsonl_from_json(input_json):
    print("Entrou criar jsonl")
    output_dir = 'temp'
    output_path = os.path.join(output_dir, 'output.jsonl')

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(output_path, 'w') as f:
        for item in input_json['info']:
            message = {
                "messages": [
                    {"role": "system", "content": input_json['system']},
                    {"role": "user", "content": item['user']},
                    {"role": "assistant", "content": item['response']}
                ]
            }
            f.write(json.dumps(message) + '\n')


def send_fine(key, model):
    # openai.api_key = key

    # Enviar o arquivo para fine-tuning
    with open("temp/output.json", "rb") as file:
        openai.api_key = key
        op = openai.File.create(
            file=file,  # open(file),   "dados.jsonl", "rb"),
            purpose='fine-tune'
        )
        # Minimo 10 linhas para finetuning
        # print(op)
        openai.FineTuningJob.create(
            training_file=op.get("id"), model=model)
    # print(response)


def delete_jsonl():
    pass
