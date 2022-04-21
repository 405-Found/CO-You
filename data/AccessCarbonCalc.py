from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

#select country
driver = webdriver.Chrome(r"\chromedriver_win32\chromedriver.exe")
driver.get('https://www.carbonfootprint.com/calculator.aspx')
frame_0 = driver.find_element_by_id('cphContent_ifrCalc')
driver.switch_to.frame(frame_0)
select = Select(driver.find_element_by_id(r"ctl05_cczLocation_ddlCountry"))
country = input("Country: ").upper()
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
           "Wood pellets (KG / 1000)" : "ctl05_chsHouse_txtWoodUsage"}
for i in cell_id:
    into = driver.find_element_by_id(cell_id[i])
    consumption = input(i)
    into.send_keys(consumption)
driver.find_element_by_id('btnNextTab').click()

#flights
yn = input("Taken any flights?")
count = 0
while yn.lower()[0] == 'y' and count < 3:
    select = (driver.find_element_by_id(r"ctl05_rcbAirportFrom_Input"))
    count += 1
    oneway = input("One way? (y/n)")
    if oneway.lower()[0] == 'y':
        driver.find_element_by_id("ctl05_rbnOneWay").click()
    loc = input("Takeoff airport code: ")
    select.send_keys(loc + "\n")
    loc = input("Landing airport code: ")
    select = (driver.find_element_by_id(r"ctl05_rcbAirportTo_Input"))
    select.send_keys(loc + "\n")
    driver.find_element_by_class_name("calcbutton").click()
    yn = input("more?")
driver.find_element_by_id('btnNextTab').click()

#car
km = input("by car: ")
into = driver.find_element_by_id("ctl05_cdsCar_txtMileage")
into.send_keys(km)
select = (driver.find_element_by_id("ctl05_cefCar_txtEfficiency"))
select.send_keys('171.48')
select = Select(driver.find_element_by_id("ctl05_cefCar_ddlEfficiencyUnit"))
select.select_by_visible_text("g/km")
driver.find_element_by_class_name("calcbutton").click()
driver.find_element_by_id('btnNextTab').click()
