<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb d-xsl">


    <tb:page>
        <mode:default>
            <xsl:apply-templates select="." mode="bb:content"/>
        </mode:default>
        <te:css>
            <mode:default>
                <e:css b="html-page"><d-xsl:apply-templates/></e:css>
            </mode:default>
        </te:css>
        <te:js>
            <mode:default>
                <e:js b="html-page"><d-xsl:apply-templates/></e:js>
            </mode:default>
        </te:js>
    </tb:page>

</xsl:stylesheet>
