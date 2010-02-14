<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:d-xsl="b:xsl"
    xmlns:b="b"
    extension-element-prefixes="x"
    exclude-result-prefixes="b d-xsl"
    >

    <xsl:template match="b:block[@name = 'page']">
        <xsl:apply-templates select="." mode="b:content"/>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'page' and @name = 'css']">
        <b:elem name="css" block="html-page"><d-xsl:apply-templates/></b:elem>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'page' and @name = 'js']">
        <b:elem name="js" block="html-page">
            <b:data charset="cp-1256"/>
            <d-xsl:apply-templates/>
        </b:elem>
    </xsl:template>

</xsl:stylesheet>
