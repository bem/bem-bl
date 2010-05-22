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
                <e:column m:side="input">
                    <b:form-input/>
                </e:column>
                <e:column m:side="button">
                    <e:button b="search"/>
                </e:column>
            </b:layout-table>
        </mode:content>
    </tb:search>

</xsl:stylesheet>
