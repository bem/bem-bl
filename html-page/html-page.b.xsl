<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:d-xsl="b:xsl"
    xmlns:b="b"
    extension-element-prefixes="x"
    exclude-result-prefixes="b d-xsl"
    >

    <xsl:template match="b:block[@name = 'html-page']" mode="b:node-name">html</xsl:template>

    <xsl:template match="b:block[@name = 'html-page']" mode="b:content">
        <xsl:apply-templates select="b:elem[@block = 'html-page']"/>
        <b:elem name="body" block="html-page">
            <xsl:apply-templates select="*[not(self::b:elem[@block = 'html-page'])]"/>
        </b:elem>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'head']" mode="b:node-name">head</xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'head']" mode="b:content">
        <b:elem name="meta" block="html-page">
            <b:data name="MSSmartTagsPreventParsing" content="true"/>
        </b:elem>
        <b:elem name="meta" block="html-page">
            <b:data http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        </b:elem>
        <b:elem name="meta" block="html-page">
            <b:data http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
        </b:elem>
        <xsl:apply-templates select="." mode="b:html-page__favicon"/>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'meta']" mode="b:node-name">meta</xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'meta']" mode="b:content">
        <xsl:copy-of select="b:data/@*"/>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'head']" mode="b:html-page__favicon">
        <b:elem name="favicon" block="html-page">favicon.ico</b:elem>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'favicon']" mode="b:node-name">link</xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'favicon']" mode="b:content">
        <xsl:attribute name="rel">shortcut icon</xsl:attribute>
        <xsl:attribute name="href">
            <xsl:apply-templates/>
        </xsl:attribute>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'css']">
        <xsl:comment>[if gt IE 7]&gt;&lt;!</xsl:comment>
        <link rel="stylesheet">
            <d-xsl:attribute name="href">
                <xsl:apply-templates/>
                <xsl:text>.css</xsl:text>
            </d-xsl:attribute>
        </link>
        <xsl:comment>&lt;![endif]</xsl:comment>
        <xsl:comment>
            <xsl:text>[if lt IE 8]&gt;&lt;link rel=stylesheet href="</xsl:text>
            <xsl:apply-templates/>
            <xsl:text>.ie.css"&gt;&lt;![endif]</xsl:text>
        </xsl:comment>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'js']" mode="b:node-name">script</xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'js']" mode="b:content">
        <xsl:attribute name="type">text/javascript</xsl:attribute>
        <xsl:choose>
            <xsl:when test="b:data/@charset">
                <xsl:copy-of select="b:data/@charset"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="charset">utf-8</xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
        <d-xsl:attribute name="src">
            <xsl:apply-templates/>
            <xsl:text>.js</xsl:text>
        </d-xsl:attribute>
    </xsl:template>

    <xsl:template match="b:elem[@block = 'html-page' and @name = 'body']" mode="b:node-name">body</xsl:template>

    <xsl:template match="b:block[@name = 'html-page'] |
        b:elem[@block = 'html-page'][
            @name = 'head' or
            @name = 'meta' or
            @name = 'favicon' or
            @name = 'css' or
            @name = 'js' or
            @name = 'body']" mode="b:css-class"/>

    <xsl:template match="b:block[@name = 'html-page']" mode="b:onclick"/>

</xsl:stylesheet>
