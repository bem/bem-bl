<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:menu>
        <tm:layout val="horiz-complex">
            <mode:content>
                <b:layout-table>
                    <mix:mix><e:layout b="menu"/></mix:mix>
                    <xsl:apply-templates/>
                </b:layout-table>
            </mode:content>

            <te:item>
                <mode:default>
                    <xsl:choose>
                        <xsl:when test="not(preceding-sibling::e:item)">
                            <e:column b="layout-table">
                                <mix:mix><e:column m:position="first"/></mix:mix>
                                <xsl:apply-imports/>
                            </e:column>
                        </xsl:when>
                        <xsl:when test="not(following-sibling::e:item)">
                            <e:column b="layout-table">
                                <mix:mix><e:column m:position="last"/></mix:mix>
                                <xsl:apply-imports/>
                            </e:column>
                        </xsl:when>
                        <xsl:otherwise>
                            <e:column b="layout-table">
                                <mix:mix><e:column/></mix:mix>
                                <xsl:apply-imports/>
                            </e:column>
                        </xsl:otherwise>
                    </xsl:choose>
                </mode:default>
            </te:item>

            <te:title>
                <mode:tag>h3</mode:tag>
                <mode:default>
                    <e:column b="layout-table">
                        <mix:mix><e:column m:type="title"/></mix:mix>
                        <xsl:apply-imports/>
                    </e:column>
                </mode:default>
            </te:title>

            <te:gap>
                <mode:default>
                    <e:column b="layout-table">
                        <mix:mix><e:column m:type="gap"/></mix:mix>
                    </e:column>
                </mode:default>
            </te:gap>

            <te:separator>
                <mode:tag>i</mode:tag>
                <mode:default>
                    <e:column b="layout-table">
                        <mix:mix><e:column m:type="separator"/></mix:mix>
                        <xsl:apply-imports/>
                    </e:column>
                </mode:default>
            </te:separator>
        </tm:layout>
    </tb:menu>

</xsl:stylesheet>
