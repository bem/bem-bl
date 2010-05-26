<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
xmlns:bb="bem-b"
xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
xmlns:d-xsl="bem-b:xsl:dynamic"
exclude-result-prefixes="bb tb te tm mode b e m mix d-xsl">

    <tb:pager>
        <te:prev>
            <tm:state val="inactive">
                <mode:tag>span</mode:tag>
                <mode:content>
                    <e:prev-key  m:state="inactive">&#8592;&#160;Ctrl</e:prev-key>
                    <b:link m:color="default">
                        <mix:mix><e:prev-link b="pager" m:state="inactive"/></mix:mix>
                        <xsl:apply-templates/>
                    </b:link>
                </mode:content>
            </tm:state>
        </te:prev>

        <te:prev-key>
            <mode:tag>span</mode:tag>
        </te:prev-key>
    </tb:pager>

</xsl:stylesheet>
