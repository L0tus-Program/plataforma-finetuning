from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from utils import *

app = Flask(__name__,static_folder='static', template_folder='templates')
CORS(app)  # Adiciona a configuração de CORS ao aplicativo


@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    data = request.get_json()

    # Faça o que quiser com os dados recebidos
    print("Dados recebidos:")
    print(data)
    key = data["key"]
    model = data["models"]
    # Supondo que 'data' é o JSON enviado pela aplicação React
    create_jsonl_from_json(data)
    send_fine(key, model)
    # delete_jsonl()

    # Pode retornar uma mensagem de sucesso se necessário
    return jsonify({'message': 'Dados recebidos com sucesso!'}), 200


@app.route('/teste', methods=['GET'])
def padrao():
    # return ("API online"),200
    return jsonify({'message': 'Dados recebidos com sucesso!'}), 200


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
