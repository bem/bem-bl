<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:logo>
        <mode:content>
            <b:link>
                <mix:mix><e:link b="logo"/></mix:mix>

                <!-- TODO: унести e:url в атрибут -->
                <!-- TODO: не задавать URL в случае index или выводить <span> вместо <a> -->
                <e:url>
                    <xsl:choose>
                        <xsl:when test="@url">
                            <xsl:value-of select="@url"/>
                        </xsl:when>
                        <!-- TODO: задавать это на следующем уровне переопределения -->
                        <xsl:otherwise>http://www.yandex.ru</xsl:otherwise>
                    </xsl:choose>
                </e:url>

                <e:img b="logo">
                    <xsl:attribute name="src">
                        <xsl:choose>
                            <xsl:when test="@img">
                                <xsl:value-of select="@img"/>
                            </xsl:when>
                            <!-- TODO: задавать это на следующем уровне переопределения -->
                            <xsl:otherwise>//yandex.st/lego/_/X31pO5JJJKEifJ7sfvuf3mGeD_8.png</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                    <xsl:attribute name="alt">
                        <xsl:choose>
                            <xsl:when test="@alt">
                                <xsl:value-of select="@alt"/>
                            </xsl:when>
                            <!-- TODO: задавать это на следующем уровне переопределения -->
                            <xsl:otherwise>Яндекс</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </e:img>
            </b:link>
        </mode:content>

        <te:img>
            <mode:tag>img</mode:tag>
            <mode:content>
                <xsl:copy-of select="@src | @alt"/>
                <xsl:apply-templates/>
            </mode:content>
        </te:img>
    </tb:logo>

</xsl:stylesheet>
