/**
 * Конвертер графика GoogleSheets в PNG.
 *
 * @return возращает url ссылку на сгенирированное PNG изображение из вашего GoogleDrive
 */
function convert_PNG() {
  //выбираем таблицу где будем выводить ссылку
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ТАБЛИЦА2"); 
  
  //выбираем таблицу с графиком
  var ss1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ТАБЛИЦА1"); 
  
  //получаем наш график
  var chart = ss1.getCharts()[0]; 

  //создаем прокси-слайд
  var proxySlide = SlidesApp.create("proxySlide");
  var proxySaveSlide = proxySlide.getSlides()[0];
  var chartImage = proxySaveSlide.insertSheetsChartAsImage(chart);

  //получаем изображение из слайда
  var myimage = chartImage.getAs('image/png');
  var pngID = DriveApp.getFolderById('ID-ПАПКИ-КУДА-БУДЕТ-СОХРАНЯТЬСЯ-PNG').createFile(myimage);
  
  //даем доступ к нашему изображению по ссылке
  DriveApp.getFileById(pngID.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var url = pngID.getDownloadUrl();

  //удаляем прокси-слайд
  DriveApp.getFileById(proxySlide.getId()).setTrashed(true);

  //выводим url ссылку на изображение
  ss.getRange(15,1).setValue(url);
}
