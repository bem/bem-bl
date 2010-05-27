<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
xmlns:bb="bem-b"
xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
xmlns:d-xsl="bem-b:xsl:dynamic"
exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:pager>
        <!--<mode:content match="[not(e:pages)]">-->
            <!--<xsl:apply-templates select="*[not(self::e:page)]"/>-->
            <!--<e:pages>-->
                <!--<xsl:apply-templates select="e:page"/>-->
            <!--</e:pages>-->
        <!--</mode:content>-->

        <te:url>
            <mode:default>
                <xsl:apply-templates/>
            </mode:default>
        </te:url>
    </tb:pager>

</xsl:stylesheet>
