import openai
import os
import json
import sqlite3 


# Registrar numero de acessos na página
def register():
    conn = sqlite3.connect("registro.db")
    cursor = conn.cursor()

    # Selecionando o valor atual de numero_acessos
    cursor.execute('SELECT numero_acessos FROM registros WHERE id = 1')  # Supondo que o id seja 1
    valor_atual = cursor.fetchone()[0]

    # Incrementando o valor em 1
    novo_valor = valor_atual + 1

    # Atualizando o valor de numero_acessos na tabela
    cursor.execute('UPDATE registros SET numero_acessos = ? WHERE id = 1', (novo_valor,))  # Supondo que o id seja 1

    # Salvando as alterações e fechando a conexão com o banco de dados
    conn.commit()
    conn.close()
    



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

 


# Conectando ao banco de dados ou criando-o se não existir
conn = sqlite3.connect('registro.db')
cursor = conn.cursor()

# Criando a tabela 'registros' se ela ainda não existir
cursor.execute('''CREATE TABLE IF NOT EXISTS registros (
                        id INTEGER PRIMARY KEY,
                        numero_acessos INTEGER
                    )''')

# Verificando se a tabela 'registros' está vazia
cursor.execute("SELECT COUNT(*) FROM registros")
result = cursor.fetchone()

if result[0] == 0:
    # Inserindo o valor '1' na coluna 'numero_acessos'
    cursor.execute("INSERT INTO registros (id, numero_acessos) VALUES (1, 1)")
    print("Tabela 'registros' vazia, valor '1' inserido na coluna 'numero_acessos'.")

else:
    print("A tabela 'registros' já contém dados, não foi inserido o valor '1'.")

# Salvando as alterações e fechando a conexão com o banco de dados
conn.commit()
conn.close()