// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class AddnewmealTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new FirefoxDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void addnewmeal() {
    driver.get("https://gymprogress.lukakordic.me/");
    driver.manage().window().setSize(new Dimension(1609, 1106));
    driver.findElement(By.linkText("Go to the app")).click();
    {
      WebElement element = driver.findElement(By.linkText("Nutrition"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.linkText("Nutrition")).click();
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    {
      WebElement element = driver.findElement(By.linkText("User Profile"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    driver.findElement(By.cssSelector(".bg-blue-400")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".bg-blue-400"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    driver.findElement(By.name("name")).click();
    driver.findElement(By.name("name")).sendKeys("Rucak");
    driver.findElement(By.cssSelector(".bg-green-500")).click();
    driver.findElement(By.cssSelector(".mb-4:nth-child(1) > .p-2")).click();
    driver.findElement(By.cssSelector(".mb-4:nth-child(1) > .p-2")).sendKeys("Rucak");
    driver.findElement(By.name("servingSize")).sendKeys("1");
    driver.findElement(By.name("servingSizeType")).sendKeys("grams");
    driver.findElement(By.name("calories")).sendKeys("1230");
    driver.findElement(By.name("fats")).sendKeys("123");
    driver.findElement(By.name("saturatedFats")).sendKeys("3012");
    driver.findElement(By.name("transFats")).sendKeys("123");
    driver.findElement(By.cssSelector(".justify-between > .bg-blue-500")).click();
    driver.findElement(By.cssSelector(".mt-6:nth-child(1)")).click();
    driver.close();
  }
}
