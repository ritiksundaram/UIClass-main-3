from flask import Flask, send_file

app = Flask(__name__)
@app.route('/api/data')

def get_data():
    return send_file('./data.json', as_attachment=False)


@app.route('/api/history')
def get_history():
    return send_file('./history2.json', as_attachment=False)



if __name__ == '__main__':
    app.run(debug=True)
