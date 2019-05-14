<?php
/**
 * Created by PhpStorm.
 */

class files
{
    /* @var $webPath string - Переменная содержащая директорию веб-проекта */
    public static $webPath = "";

    /**
     * Возвращает ссылку на файл с датой изменения для предотвращения кеширования
     * @var $filename string
     * @return string
     */
    public static function noCash($filename)
    {
        $filemod = filemtime(self::$webPath . $filename);
        return $filename . "?" . $filemod;
    }
}