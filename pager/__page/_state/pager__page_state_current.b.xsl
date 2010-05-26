<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
xmlns:bb="bem-b"
xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
xmlns:d-xsl="bem-b:xsl:dynamic"
exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:pager>
        <te:page>
            <tm:state val="current">
                <mode:default>
                    <b:link m:color="default">
                        <mix:mix><e:page b="pager" m:state="current"/></mix:mix>
                        <xsl:apply-templates/>
                    </b:link>
                </mode:default>
            </tm:state>
        </te:page>
    </tb:pager>

</xsl:stylesheet>
