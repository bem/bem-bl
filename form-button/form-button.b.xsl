<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b" xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    exclude-result-prefixes="bb tb te tm mode b e m mix">

    <tb:form-button>
        <mode:tag>input</mode:tag>

        <mode:content>
            <xsl:apply-templates select="@type | @text | node()"/>
        </mode:content>

        <mode:default match="/@type">
            <e:type>
                <xsl:value-of select="."/>
            </e:type>
        </mode:default>

        <!-- TODO: не работает default на submit -->
        <te:type>
            <mode:default>
                <xsl:attribute name="type">
                    <xsl:choose>
                        <xsl:when test="@type">
                            <xsl:value-of select="@type"/>
                        </xsl:when>
                        <xsl:otherwise>submit</xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </mode:default>
        </te:type>

        <mode:default match="/@text">
            <e:text>
                <xsl:value-of select="."/>
            </e:text>
        </mode:default>

        <te:text>
            <mode:default>
                <xsl:attribute name="value">
                    <xsl:apply-templates/>
                </xsl:attribute>
            </mode:default>
        </te:text>
    </tb:form-button>

</xsl:stylesheet>
