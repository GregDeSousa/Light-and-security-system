import RPi.GPIO as GPIO
import time
import signal
import sys
import os
import string
from random import *
from threading import Thread

#import pygame


# use Raspberry Pi board pin numbers
GPIO.setmode(GPIO.BCM)

# set GPIO Pins
pinTrigger = 18
pinEcho = 24
test = 50
min_char=5
max_char=6
pin = 17
allchar = string.ascii_letters + string.digits
arm=False 
ScareArm=False
LightIsOn=False
socketio = None
doorOpened = False

#root = Tk()

#root.title("Security system")
#root.geometry("400x300")

#app = Frame(root)
#app.grid()

#label = Label(app, text = "Secuirty system controls")
#label.grid()

def close(signal, frame):
	print("\nTurning off ultrasonic distance detection...\n")
	GPIO.cleanup() 
	sys.exit(0)

signal.signal(signal.SIGINT, close)

# set GPIO input and output channels
GPIO.setup(pinTrigger, GPIO.OUT)
GPIO.setup(pinEcho, GPIO.IN)
GPIO.setup(pin, GPIO.OUT)

                
def LightOn():
        GPIO.output(pin, GPIO.HIGH)

def LightOff():
        GPIO.output(pin, GPIO.LOW)


def Status():
        global doorOpened
        return LightIsOn,arm,doorOpened

def On():
        global LightIsOn
        # use Raspberry Pi board pin numbers
        GPIO.setmode(GPIO.BCM)

        # set GPIO Pins
        pinTrigger = 18
        pinEcho = 24
        GPIO.setup(pinTrigger, GPIO.OUT)
        GPIO.setup(pinEcho, GPIO.IN)
        GPIO.setup(pin, GPIO.OUT)
        
        

        GPIO.output(pin, GPIO.HIGH)
        LightIsOn=True

def Off():
        global LightIsOn
        GPIO.setmode(GPIO.BCM)

        # set GPIO Pins
        pinTrigger = 18
        pinEcho = 24
        # set GPIO input and output channels
        GPIO.setup(pinTrigger, GPIO.OUT)
        GPIO.setup(pinEcho, GPIO.IN)
        GPIO.setup(pin, GPIO.OUT)

        GPIO.output(pin, GPIO.LOW)
        LightIsOn=False

def Scare():

        time.sleep(10)

        
        GPIO.setmode(GPIO.BCM)

        # set GPIO Pins
        pinTrigger = 18
        pinEcho = 24
        # set GPIO input and output channels
        GPIO.setup(pinTrigger, GPIO.OUT)
        GPIO.setup(pinEcho, GPIO.IN)
        GPIO.setup(pin, GPIO.OUT)
        
        pygame.mixer.init()
        pygame.mixer.music.load("/home/pi/Desktop/Girl Horror Scream Sound Effects All Sounds.mp3")
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        pygame.mixer.music.play()
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
#        while pygame.mixer.music.get_busy() == True:
 #         continue       

        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)



def ScareTactic():
        time.sleep(10)
        
        pygame.mixer.init()
        pygame.mixer.music.load("/home/pi/Desktop/Girl Horror Scream Sound Effects All Sounds.mp3")
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        pygame.mixer.music.play()
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
#        while pygame.mixer.music.get_busy() == True:
 #         continue       

        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.15)
        GPIO.output(pin, GPIO.LOW)

def Arm():
        global arm
        arm=True
        
def Disarm():
        global arm 
        arm=False
        
def ScareTactic_Arm():
        global ScareArm
        ScareArm=True
        print("working")
        print(ScareArm)

#fowardButton = Button(app, text = "ARM",command= Arm)
#fowardButton.grid()

#leftButton = Button(app, text = "DISARM",command= Disarm)
#leftButton.grid()

#ON_Button = Button(app, text = "On",command= On)
#ON_Button.grid()

#OFF_Button = Button(app, text = "Off",command= Off)
#OFF_Button.grid()

#OFF_Button = Button(app, text = "ScareTactic Arm",command= ScareTactic_Arm)
#OFF_Button.grid()

#root.mainloop()

def set_socketio(sio):
        global socketio
        socketio = sio
                

def OpenDoor(distance,arm,ScareArm):
 #print(arm)
 global LightIsOn
 global doorOpened
 prevStatus = doorOpened
 if distance<30:
        doorOpened = True
        if arm==True:
                if ScareArm==False:
                   LightOn()
                   print("Door open")
                elif ScareArm==True:
                   print("BOO!!")
                   ScareTactic()
                   ScareArm=False
          
 else:
        doorOpened = False
        if arm==True:
             if ScareArm==False:
                if distance>30:
                   print("Door closed")
                   if not LightIsOn:
                        LightOff()
                        
 if prevStatus != doorOpened:
        if socketio:
                socketio.emit("door_status",{"status":doorOpened})
 
 
def Polling():
        global arm
        while True:
                #print("arm status" + str(arm))
                # set Trigger to HIGH
                GPIO.output(pinTrigger, True)
                # set Trigger after 0.01ms to LOW
                time.sleep(0.00001)
                GPIO.output(pinTrigger, False)

                startTime = time.time()
                stopTime = time.time()

                # save start time
                while 0 == GPIO.input(pinEcho):
                        startTime = time.time()

                # save time of arrival
                while 1 == GPIO.input(pinEcho):
                        stopTime = time.time()

                # time difference between start and arrival
                TimeElapsed = stopTime - startTime
                # multiply with the sonic speed (34300 cm/s)
                # and divide by 2, because there and back
                distance = (TimeElapsed * 34300) / 2

                #print ("Distance: %.1f cm" % distance)
                time.sleep(1)       
                OpenDoor(distance,arm,ScareArm)


def StartThread():
        Thread(target=Polling, daemon=True).start()
        


	       



        

