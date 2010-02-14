<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:d-xsl="b:xsl"
    xmlns:b="b"
    extension-element-prefixes="x"
    exclude-result-prefixes="b d-xsl"
    >

    <xsl:template match="b:block[@name = 'layout']" mode="b:node-name">table</xsl:template>

    <xsl:template match="b:elem[@block = 'layout' and @name = 'row']" mode="b:node-name">tr</xsl:template>

    <xsl:template match="b:elem[@block = 'layout' and @name = 'column']" mode="b:node-name">td</xsl:template>

    <xsl:template match="b:block[@name = 'layout'][not(b:elem[@block = 'layout' and @name = 'row'])]" mode="b:content">
        <b:elem block="layout" name="row">
            <xsl:apply-templates/>
        </b:elem>
    </xsl:template>

</xsl:stylesheet>
