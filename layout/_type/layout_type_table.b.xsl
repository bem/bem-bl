<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:layout>
        <tm:type val="table">
            <mode:tag>table</mode:tag>

            <mode:content match="[not(e:row)]">
                <e:row>
                    <xsl:apply-templates/>
                </e:row>
            </mode:content>

            <te:row>
                <mode:tag>tr</mode:tag>
            </te:row>

            <te:column>
                <mode:tag>td</mode:tag>
            </te:column>
        </tm:type>
    </tb:layout>

</xsl:stylesheet>
