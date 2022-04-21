from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome(r"\chromedriver_win32\chromedriver.exe")
driver.get('https://www.carbonfootprint.com/calculator.aspx')
frame_0 = driver.find_element_by_id('cphContent_ifrCalc')
driver.switch_to.frame(frame_0)
select = Select(driver.find_element_by_id(r"ctl05_cczLocation_ddlCountry"))
print(select)
country = input("Country: ").upper()
country = country[0] + country[1:].lower()
select.select_by_visible_text(country)
driver.find_element_by_id('btnNextTab').click()
