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
                    <xsl:value-of select="../@separator"/>
                </mode:default>
            </te:item>

            <te:separator>
                <mode:default>
                    qqq
                </mode:default>
            </te:separator>

<!--
            <te:item match="[not(following-sibling::e:item)]">
                <mode:default>
                    QQQ
                </mode:default>
            </te:item>
-->
        </tm:layout>
    </tb:menu>

</xsl:stylesheet>
