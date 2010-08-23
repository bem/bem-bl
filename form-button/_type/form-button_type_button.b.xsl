<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b" xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    exclude-result-prefixes="bb tb te tm mode b e m mix">

    <tb:form-button>
        <tm:type val="button">
            <mode:tag>button</mode:tag>

            <te:text>
                <mode:default>
                    QQQ
                    <!--<xsl:value-of select="@text"/>-->
                </mode:default>
            </te:text>
        </tm:type>
    </tb:form-button>

</xsl:stylesheet>
