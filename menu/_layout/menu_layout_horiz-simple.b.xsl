<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:menu>
        <tm:layout val="horiz-simple">
            <te:item>
                <mode:default>
                    <xsl:apply-templates/>
                    <xsl:if test="(@m:position and @m:position != 'last') or following-sibling::e:item">
                        <xsl:value-of select="ancestor::b:menu/@separator"/>
                    </xsl:if>
                </mode:default>
            </te:item>
        </tm:layout>
    </tb:menu>

</xsl:stylesheet>
