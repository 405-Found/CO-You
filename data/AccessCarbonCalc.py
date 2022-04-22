from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import pandas as pd
import requests

d = {"activityItem": {
            "type": "Bus",
            "subtype": None,
            "departurePos": None,
            "arrivalPos": None,
            "start": "2022-04-22T01:36:35Z",
            "end": "2022-04-22T01:36:35Z",
            "duration": 3.0,
            "distance": 3000.0,
            "carbonAmount": 9.0
        }
     }
car = []
bus = []
train = []
home  = []
flight = []
motorbike = []

for i in d:
    if d[i]['type'] == 'Bus':
        bus.append(int(d[i]['distance']))
    elif d[i]['type'] == 'Car':
        car.append(int(d[i]['distance']))
    elif d[i]['type'] == 'Train':
        train.append(int(d[i]['distance']))
    elif d[i]['type'] == 'Flight':
        flight.append(int(d[i]['distance']))
    elif d[i]['type'] == 'Motorbike':
        motorbike.append(int(d[i]['distance']))
    else:
        home.append(int(d[i]['distance']))




driver = webdriver.Chrome(r"C:\Users\Aarushi\Downloads\chromedriver_win32\chromedriver.exe")
driver.get('https://www.carbonfootprint.com/calculator.aspx')

f = open("input_sel.json")

def click(e_id):
    driver.find_element_by_id(e_id).click()
def Cclick(classname):
        driver.find_element_by_class_name(classname).click()


frame_0 = driver.find_element_by_id('cphContent_ifrCalc')
driver.switch_to.frame(frame_0)

#select country
select = Select(driver.find_element_by_id(r"ctl05_cczLocation_ddlCountry"))
country = "AUSTRALIA" #input("Country: ").upper()
country = country[0] + country[1:].lower()
select.select_by_visible_text(country)
driver.find_element_by_id('btnNextTab').click()

#house
cell_id = {"Electricity usage in KWH: " : "ctl05_chsHouse_txtElecUsage",
           "Natuural gas KWH: " : "ctl05_chsHouse_txtGasUsage",
           "Heating oil (L) : " : "ctl05_chsHouse_txtOilUsage",
           "Coal (KG / 1000) : " : "ctl05_chsHouse_txtCoalUsage",
           "LPG (L) : " : "ctl05_chsHouse_txtLpgUsage",
           "Propane (L) : " : "ctl05_chsHouse_txtPropaneUsage",
           "Wood pellets (KG / 1000): " : "ctl05_chsHouse_txtWoodUsage"}
for i in cell_id:
    into = driver.find_element_by_id(cell_id[i])
    consumption = "0" #input(i)
    into.send_keys(str(sum(home)))
Cclick("calcbutton")
click('btnNextTab')

#flights
yn = 'n'#input("Taken any flights?")
count = 0
while yn.lower()[0] == 'y' and count < 3:
    select = (driver.find_element_by_id(r"ctl05_rcbAirportFrom_Input"))
    count += 1
    oneway = 'n'#input("One way? (y/n)")
    if oneway.lower()[0] == 'y':
        driver.find_element_by_id("ctl05_rbnOneWay").click()
    loc = 'ixr'#input("Takeoff airport code: ")
    select.send_keys(loc + "\n")
    loc = 'blr'#input("Landing airport code: ")
    select = (driver.find_element_by_id(r"ctl05_rcbAirportTo_Input"))
    select.send_keys(loc + "\n")
    Cclick("calcbutton")
    yn = 'n'#input("more?")
click('btnNextTab')


#car
into = driver.find_element_by_id("ctl05_cdsCar_txtMileage")
into.send_keys(str(sum(car)))
select = (driver.find_element_by_id("ctl05_cefCar_txtEfficiency"))
select.send_keys('171.48')
select = Select(driver.find_element_by_id("ctl05_cefCar_ddlEfficiencyUnit"))
select.select_by_visible_text("g/km")
Cclick("calcbutton")
click('btnNextTab')

#motorbike ctl05_cdsMotorbike_txtMileage
km = '0'#input("by motorbike: ")
into = driver.find_element_by_id("ctl05_cdsMotorbike_txtMileage")
into.send_keys(str(sum(motorbike)))
select = (driver.find_element_by_id("ctl05_ddlMotorbikeDerivative"))
select.send_keys('100.9')
select = Select(driver.find_element_by_id("ctl05_cefMotorbike_ddlEfficiencyUnit"))
select.select_by_visible_text("g/km")
Cclick("calcbutton")
click('btnNextTab')

#bus, and long distance train
into = driver.find_element_by_id("ctl05_cdsBus_txtMileage")
into.send_keys(str(sum(bus)))
into = driver.find_element_by_id("ctl05_cdsIntRail_txtMileage")
into.send_keys(str(sum(train)))
Cclick("calcbutton")
click('btnNextTab')


driver.find_element_by_id('btnNextTab').click()
result = driver.find_element_by_id("ctl05_csyResults_lblTotal").text.split(" = ")[-1].split(" ")[0]
print(result)
from time import sleep
sleep(10)

#requests.post(site,
#              json={"result" : result})


driver.find_element_by_id('ctl05_csyResults_hylTotalToOffset').click()
choice = "Global Portfolio"
driver.find_element_by_id("cphContent_btnCEF").click()
name = "username"
driver.find_element_by_id("cphContent_txtName").send_keys(name)
click("cphContent_btnAdd")
click("cphContent_btnCheckout")

driver.find_element_by_id("cphContent_lgvLogin_txtUsername").send_keys('rlmkzgogrzvbztytdp@bvhrs.com')
driver.find_element_by_id("cphContent_lgvLogin_txtPassword").send_keys('aaaaaaaa')
click("cphContent_lgvLogin_btnLogin")
click("cphContent_btnPlaceOrder")
click("cphContent_btnStripe")

#do payment



