import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import useStateWithLocalStorage from '../../../hooks/useStateWithLocalStorage';
import {
    Filter,
    ToggleFilter,
    InputFilter,
    RangeFilter,
} from '../../../components/filter';
import SmallItemTable from '../../../components/small-item-table';

const marks = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
};

function Armor(props) {
    const [includeRigs, setIncludeRigs] = useStateWithLocalStorage(
        'includeRigs',
        true,
    );
    const [minArmorClass, setMinArmorClass] = useStateWithLocalStorage(
        'minArmorClass',
        1,
    );
    const [maxArmorClass, setMaxArmorClass] = useStateWithLocalStorage(
        'maxArmorClass',
        6,
    );
    const [maxPrice, setMaxPrice] = useStateWithLocalStorage(
        'armorMaxPrice',
        '',
    );
    const { t } = useTranslation();

    const handleArmorClassChange = ([min, max]) => {
        setMinArmorClass(min);
        setMaxArmorClass(max);
    };

    const typeFilter = ['armor'];

    if (includeRigs) {
        typeFilter.push('rig');
    }

    return [
        <Helmet key={'armor-table'}>
            <meta charSet="utf-8" />
            <title>Armor chart</title>
            <meta
                name="description"
                content="All armor in Escape from Tarkov sortable by price, repairability, armor class etc"
            />
        </Helmet>,
        <div className="display-wrapper" key={'display-wrapper'}>
            <div className="page-headline-wrapper">
                <h1>{t('Armors')}</h1>
                <Filter center>
                    <ToggleFilter
                        label={t('Include rigs')}
                        onChange={(e) => setIncludeRigs(!includeRigs)}
                        checked={includeRigs}
                    />
                    <RangeFilter
                        defaultValue={[minArmorClass, maxArmorClass]}
                        label={t('Min armor class')}
                        min={1}
                        max={6}
                        marks={marks}
                        onChange={handleArmorClassChange}
                    />
                    <InputFilter
                        defaultValue={maxPrice || ''}
                        label={t('Max price')}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        placeholder={t('Max price')}
                        type="number"
                    />
                </Filter>
            </div>
            <SmallItemTable
                typeFilter={'armor'}
                excludeTypeFilter={includeRigs ? false : 'rig'}
                minPropertyFilter={{
                    property: 'armorClass',
                    value: minArmorClass,
                }}
                maxPropertyFilter={{
                    property: 'armorClass',
                    value: maxArmorClass,
                }}
                maxPrice={maxPrice}
                fleaPrice
                armorClass
                armorZones
                barterPrice
                maxDurability
                effectiveDurability
                repairability
                stats
            />
        </div>,
    ];
}

export default Armor;
