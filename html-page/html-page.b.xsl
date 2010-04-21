<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:bb="bem-b"
    xmlns:tb="bem-b:template:block" xmlns:te="bem-b:template:elem" xmlns:tm="bem-b:template:mod" xmlns:mode="bem-b:template:mode"
    xmlns:b="bem-b:block" xmlns:e="bem-b:elem" xmlns:m="bem-b:mod" xmlns:mix="bem-b:mix"
    xmlns:d-xsl="bem-b:xsl:dynamic"
    exclude-result-prefixes="bb d-xsl">

    <tb:html-page>

        <mode:default>
            <html id="nojs">
                <xsl:apply-templates select="e:head"/>
                <e:body>
                    <xsl:apply-templates select="*[not(self::e:head)]"/>
                </e:body>
            </html>
        </mode:default>

        <te:head>
            <mode:default>
                <head>
                    <e:meta name="MSSmartTagsPreventParsing" content="true"/>
                    <e:meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                    <e:meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
                    <xsl:apply-templates/>
                </head>
            </mode:default>
        </te:head>

        <te:meta>
            <mode:default>
                <meta>
                    <xsl:apply-templates select="." mode="bb:content"/>
                </meta>
            </mode:default>
            <mode:content>
                <xsl:copy-of select="@http-equiv | @content | @name"/>
            </mode:content>
        </te:meta>

        <te:favicon>
            <mode:default>
                <link rel="icon">
                    <xsl:attribute name="href">
                        <xsl:apply-templates/>
                    </xsl:attribute>
                </link>
            </mode:default>
        </te:favicon>

        <te:css>
            <mode:default>
                <xsl:comment>[if gt IE 7]&gt;&lt;!</xsl:comment>
                <link rel="stylesheet">
                    <d-xsl:attribute name="href">
                        <xsl:apply-templates/>
                        <xsl:text>.css</xsl:text>
                    </d-xsl:attribute>
                </link>
                <xsl:comment>&lt;![endif]</xsl:comment>
                <xsl:comment>
                    <xsl:text>[if lt IE 8]&gt;&lt;link rel=stylesheet href="</xsl:text>
                    <xsl:apply-templates/>
                    <xsl:text>.ie.css"&gt;&lt;![endif]</xsl:text>
                </xsl:comment>
            </mode:default>
        </te:css>

        <te:js>
            <mode:default>
                <script type="text/javascript">
                    document.documentElement.id = "js";
                </script>

                <script type="text/javascript" charset="utf-8">
                    <xsl:copy-of select="@charset"/>
                    <d-xsl:attribute name="src">
                        <xsl:apply-templates/>
                        <xsl:text>.js</xsl:text>
                    </d-xsl:attribute>
                </script>
            </mode:default>
        </te:js>

        <te:body>
            <mode:default>
                <body>
                    <xsl:apply-templates select="." mode="bb:content"/>
                </body>
            </mode:default>
        </te:body>

    </tb:html-page>

</xsl:stylesheet>
