<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:form-input>
        <mode:tag>span</mode:tag>
        <mode:content match="[not(e:input)]">
            <e:input/>
        </mode:content>

        <!-- TODO: посмотреть, зачем нужен wrap-input -->
        <te:input>
            <mode:tag>input</mode:tag>
        </te:input>
    </tb:form-input>
<!--
<xsl:template match="lego:b-form-input" mode="lego:js-params-content">
    <xsl:apply-imports/>
    <xsl:if test="@autofocus = 'yes'">,autoFocus:true</xsl:if>
</xsl:template>

<xsl:template match="lego:b-form-input" mode="lego:id-content">
    <xsl:apply-templates select="." mode="lego:auto-id-content"/>
</xsl:template>

<xsl:template match="lego:b-form-input/lego:input">
    <xsl:call-template name="lego:ie-wrapper">
        <xsl:with-param name="content">
            <input>
                <xsl:apply-templates select="ancestor::lego:b-form-input[1]" mode="lego:input-attributes"/>
                <xsl:apply-templates select="." mode="lego:block-attributes"/>
            </input>
        </xsl:with-param>
    </xsl:call-template>
</xsl:template>

<xsl:template match="lego:b-bem-autocomplete[parent::lego:b-form-input]"/>

<xsl:template match="lego:b-form-input[lego:b-bem-autocomplete]" mode="lego:js-params-mix">
    <xsl:apply-templates select="lego:b-bem-autocomplete" mode="lego:js-params-for-mix"/>
</xsl:template>

<xsl:template match="lego:b-form-input[lego:b-bem-autocomplete]" mode="lego:block-class-mix">
    <xsl:apply-templates select="lego:b-bem-autocomplete" mode="lego:block-class-for-mix"/>
</xsl:template>
-->

</xsl:stylesheet>
