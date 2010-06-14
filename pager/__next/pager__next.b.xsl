<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
xmlns:bb="bem-b"
xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
xmlns:d-xsl="bem-b:xsl:dynamic"
exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:pager>
        <te:next>
            <mode:tag>span</mode:tag>
            <mode:content>
                <b:link>
                    <mix:mix><e:next-link b="pager"/></mix:mix>
                    <e:url><xsl:apply-templates select="e:url"/></e:url>
                    <xsl:choose>
                        <xsl:when test="text()">
                            <xsl:value-of select="text()"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>следующая</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </b:link>
                <e:next-key/>
            </mode:content>

            <tm:state val="inactive">
                <mode:content>
                    <b:link>
                        <mix:mix><e:next-link b="pager" m:state="inactive"/></mix:mix>
                        <xsl:choose>
                            <xsl:when test="text()">
                                <xsl:value-of select="text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>следующая</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </b:link>
                    <e:next-key m:state="inactive"/>
                </mode:content>
            </tm:state>
        </te:next>

        <te:next-key>
            <mode:tag>span</mode:tag>
            <mode:content>Ctrl&#160;&#8594;</mode:content>
        </te:next-key>
    </tb:pager>

</xsl:stylesheet>
