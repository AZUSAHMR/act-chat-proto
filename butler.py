import time
import pyautogui
import pyperclip

def copy(data):
	pyperclip.copy(data)

def paste():
	pyautogui.keyDown("ctrl")
	pyautogui.keyDown("v")
	pyautogui.keyUp("v")
	pyautogui.keyUp("ctrl")

def enter():
	pyautogui.press("enter")

def sleep(num):
	time.sleep(num)

def copy2(data):
	enter()
	copy(data)
	paste()
	enter()

if __name__=="__main__":
	time.sleep(3)
	copy2("test 1234")