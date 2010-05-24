<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:search>
        <mode:tag>form</mode:tag>
        <mode:content>
            <b:layout-table>
                <e:column>
                    <mix:mix><e:column b="search" m:side="input"/></mix:mix>
                    <b:form-input/>
                </e:column>
                <e:column>
                    <mix:mix><e:column b="search" m:side="button"/></mix:mix>
                    <!-- TODO: ASK: veged: как правильно задавать текст, чтобы его можно было локализовать и задавать в XML -->
                    <e:button b="search" text="Найти"/>
                </e:column>
            </b:layout-table>
        </mode:content>

        <te:button>
            <mode:tag>input</mode:tag>
            <mode:content>
                <xsl:attribute name="type">submit</xsl:attribute>
                <xsl:attribute name="value"><xsl:value-of select="@text"/></xsl:attribute>
            </mode:content>
        </te:button>
    </tb:search>

</xsl:stylesheet>
