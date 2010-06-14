<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
xmlns:bb="bem-b"
xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
xmlns:d-xsl="bem-b:xsl:dynamic"
exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:pager>
        <te:prev>
            <mode:tag>span</mode:tag>
            <mode:content>
                <e:prev-key/>
                <b:link>
                    <mix:mix><e:prev-link b="pager"/></mix:mix>
                    <e:url><xsl:apply-templates select="e:url"/></e:url>
                    <xsl:choose>
                        <xsl:when test="text()">
                            <xsl:value-of select="text()"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>предыдущая</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </b:link>
            </mode:content>
            
            <tm:state val="inactive">
                <mode:content>
                    <e:prev-key m:state="inactive"/>
                    <b:link>
                        <mix:mix><e:prev-link b="pager" m:state="inactive"/></mix:mix>
                        <xsl:choose>
                            <xsl:when test="text()">
                                <xsl:value-of select="text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>предыдущая</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </b:link>
                </mode:content>
            </tm:state>
        </te:prev>

        <te:prev-key>
            <mode:tag>span</mode:tag>
            <mode:content>&#8592;&#160;Ctrl</mode:content>
        </te:prev-key>
    </tb:pager>

</xsl:stylesheet>
