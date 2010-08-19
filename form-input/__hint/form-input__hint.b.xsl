<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:form-input>
        <te:hint>
            <mode:tag>label</mode:tag>
            <!-- TODO: генерировать for и id -->
            <!--
            <mode:content>
                <xsl:variable name="id">
                    <xsl:apply-templates select="ancestor::lego:b-form-input[1]" mode="lego:id-content"/>
                </xsl:variable>
                    <label for="{$id}">
                        <xsl:apply-templates select="." mode="lego:block-attributes"/>
                        <xsl:apply-templates select="." mode="lego:content"/>
                    </label>
            </mode:content>
            -->

            <!-- TODO: это вообще не надо здесь делать -->
            <!--
            <xsl:template match="lego:b-form-input/lego:hint[. = '']" mode="lego:content">
                <xsl:value-of select="lego:message('b-search-label', 'поиск')"/>
            </xsl:template>
            -->
        </te:hint>
    </tb:form-input>

</xsl:stylesheet>
</xsl:stylesheet>