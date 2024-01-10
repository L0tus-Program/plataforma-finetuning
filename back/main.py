from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from utils import *

app = Flask(__name__,static_folder='static', template_folder='templates')
CORS(app)  # Adiciona a configuração de CORS ao aplicativo



@app.route('/teste_zoho',methods=["POST"])
def zoho():
    try:
        data = request.get_json()
        print(data)
        return jsonify({"recebido": f"{data}"}),200
    except Exception as e:
        return jsonify({"Erro": f"{e}"}),400

@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    try:
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
    except Exception as e:
        return jsonify({'Error':f'{e}'}),400

 
@app.route('/registros',methods=['GET'])
def registros_endpoint():
    data = consulta_registros()
    return (data),200


@app.route('/test', methods=['GET'])
def teste():
    try:

        return jsonify({'message': 'API Online'}),200
    except Exception as e:
        return jsonify({'message': f'Erro: {e}'}),400

@app.route('/', methods=['GET'])
def index():
    register()
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
