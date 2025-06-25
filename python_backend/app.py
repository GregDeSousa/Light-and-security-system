from flask import Flask, request, jsonify
from threading import Thread
from flask_socketio import SocketIO
from flask_cors import CORS
import controller
import os



app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

controller.set_socketio(socketio)

@app.route('/toggle-light', methods=['GET','POST'])
def toggle_light():
    if request.method=="POST":
        checkbox_value = request.json.get('checkbox_1',0)
        if checkbox_value==1:
            controller.On()
            return jsonify({'status':'Light is on'})
        elif checkbox_value==0:
            controller.Off()
            return jsonify({'status':'Light is off'})
    elif request.method=="GET":
        Status = controller.Status()[0]
        if Status==True:
            return jsonify({"LightsON":True})
        else:
            return jsonify({"LightsON":False})

@app.route('/auto-light', methods=['GET','POST'])
def auto_light():
    if request.method=="POST":
        checkbox_value = request.json.get('checkbox_2',0)
        if checkbox_value==1:
            controller.Arm()
            return jsonify({'status':'Entry Lighting is on'})
        elif checkbox_value==0:
            controller.Disarm()
            return jsonify({'status':'Entry Lighting is off'})
    elif request.method=="GET":
        Status = controller.Status()[1]
        if Status==True:
            return jsonify({"EntryLighting":True})
        else:
            return jsonify({"EntryLighting":False})
        
@app.route('/door-status', methods=['GET'])
def get_door_status():
    Status = controller.Status()[2]
    if Status==True:
        return jsonify({"DoorOpened":True})
    else:
        return jsonify({"DoorOpened":False})




if __name__ == '__main__':
    #door_polling_thread = Thread(target=controller.Polling, daemon=True)
    #door_polling_thread.start()
    controller.StartThread()
        
    socketio.run(app,host='0.0.0.0', port=5000)
        
