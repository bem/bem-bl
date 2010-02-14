<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:b="b"
    xmlns:d-xsl="b:xsl"
    xmlns:html="b:html"
    extension-element-prefixes="x"
    exclude-result-prefixes="b d-xsl html"
    >

    <xsl:template match="html:*">
        <xsl:element name="{local-name()}">
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="html:table">
        <xsl:element name="{local-name()}">
            <xsl:attribute name="border">0</xsl:attribute>
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

</xsl:stylesheet>
