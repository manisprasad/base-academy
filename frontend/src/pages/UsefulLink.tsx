import { useEffect, useState } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

import { axiosInstance } from '@/api/axios';


const UsefulLink = () => {
    interface IUseFulLink {
        title: string;
        link: string;
        des: string;
        category: string;
        _id: string;
    }
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredLinks, setFilteredLinks] = useState<IUseFulLink[]>([]);
    const [usefulLinks, setUsefullLink] = useState<IUseFulLink[]>([]);

    // Filter links based on search query
    const handleSearchQuery = () => {
        if(searchQuery.length === 0 || !searchQuery) return setFilteredLinks(usefulLinks);
        const filtered = usefulLinks.filter(link => {
            return link.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                link.des.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
        })
        setFilteredLinks(filtered);
    }

    useEffect(() => {
        const fetchUsefulLinks = async () => {
            try {
                const response = await axiosInstance.get<{
                    data: IUseFulLink[];
                }>('/api/links');
                setUsefullLink(response.data.data);
                setFilteredLinks(response.data.data);
            } catch (error) {
                console.error('Error fetching useful links:', error);
            }
        };
        fetchUsefulLinks();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 mt-22">
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                📌 Useful Links
            </motion.h2>
            <div>
                <input
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearchQuery();
                    }}
                    value={searchQuery}
                    type="search"
                    placeholder="🔍 Search for links..."
                    className="w-full max-w-md px-4 py-3 border border-input rounded-lg bg-background mb-3  text-sm shadow-sm focus:outline-none focus:ring-1  focus:border-transparent transition-all"
                />

            </div>

            {/* Masonry layout using CSS columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 ">
                {filteredLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        className="break-inside-avoid p-6 bg-muted/50 border border-border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                    {link.des}
                                </p>
                            </div>

                            <div className="mt-4">
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="w-full cursor-pointer justify-center gap-2 text-base"
                                    >
                                        Visit <ExternalLinkIcon className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UsefulLink;
